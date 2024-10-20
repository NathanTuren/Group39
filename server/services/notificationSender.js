function sendNotification(volunteer, event, notificationType) {
    let notificationMessage;

    switch (notificationType) {
        case 'assignment':
            notificationMessage = `You have been assigned to the event: ${event.eventName} on ${event.eventDate}. Location: ${event.location}`;
            break;
        case 'update':
            notificationMessage = `The event: ${event.eventName} has been updated. Please check for details.`;
            break;
        case 'reminder':
            notificationMessage = `Reminder: The event: ${event.eventName} is coming up on ${event.eventDate}. Location: ${event.location}`;
            break;
        default:
            notificationMessage = `You have a new notification for the event: ${event.eventName}`;
            break;
    }

    volunteer.notification.push(notificationMessage);

    return notificationMessage;
}

// Function to notify all volunteers assigned to an event
function notifyVolunteersAssignedToEvent(volunteers, event, notificationType) {
    let notifiedVolunteers = [];

    volunteers.forEach(volunteer => {
        if (volunteer.eventParticipation.includes(event.id)) {
            const notificationMessage = sendNotification(volunteer, event, notificationType);
            notifiedVolunteers.push({
                volunteerName: volunteer.name,
                notification: notificationMessage
            });
        }
    });

    return notifiedVolunteers;
}

module.exports = {
    sendNotification,
    notifyVolunteersAssignedToEvent
};
