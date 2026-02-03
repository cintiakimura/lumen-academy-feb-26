import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email } = await req.json();

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Calculate next Friday at 2 PM CET
    const today = new Date();
    const daysUntilFriday = (5 - today.getDay() + 7) % 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
    nextFriday.setHours(14, 0, 0, 0);
    
    const endTime = new Date(nextFriday);
    endTime.setHours(15, 0, 0, 0);

    // Get Google Calendar access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlecalendar');

    // Create calendar event
    const event = {
      summary: 'LUMEN Webinar',
      description: `Join us for the LUMEN webinar. Attendee: ${name} (${email})`,
      start: {
        dateTime: nextFriday.toISOString(),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Paris'
      },
      attendees: [{ email: email }]
    };

    const calendarResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if (!calendarResponse.ok) {
      const calError = await calendarResponse.text();
      console.error('Calendar API error:', calError);
      return Response.json({ error: 'Failed to add event to calendar' }, { status: 500 });
    }

    // Send confirmation email to attendee
    await base44.integrations.Core.SendEmail({
      to: email,
      subject: 'Your LUMEN Webinar Booking Confirmed',
      body: `Hi ${name},\n\nYour spot is confirmed for the LUMEN webinar on Friday at 2:00 PM CET.\n\nWe're excited to show you how personalized learning works!\n\nBest regards,\nLUMEN Team`
    });

    // Send notification to admin
    await base44.integrations.Core.SendEmail({
      to: 'cintia@kgprotech.com',
      subject: `New Webinar Registration: ${name}`,
      body: `New attendee registered:\n\nName: ${name}\nEmail: ${email}\nTime: Friday 2:00 PM CET`
    });

    return Response.json({ 
      success: true, 
      message: 'Booking confirmed!',
      eventDate: nextFriday.toISOString()
    });
  } catch (error) {
    console.error('Booking error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});