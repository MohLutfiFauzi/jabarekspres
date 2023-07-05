import moment from 'moment';
import 'moment-duration-format';

export const getFormattedDuration = (date) => {
    const postDate = moment(date);
    const currentDate = moment();

    const duration = moment.duration(currentDate.diff(postDate));
    const secondsAgo = duration.asSeconds();
    const minutesAgo = duration.asMinutes();
    const hoursAgo = duration.asHours();
    const daysAgo = duration.asDays();

    let formattedDuration;
    if (secondsAgo < 60) {
        formattedDuration = moment.duration(secondsAgo, 'seconds').format('s [detik yang lalu]');
    } else if (minutesAgo < 60) {
        formattedDuration = moment.duration(minutesAgo, 'minutes').format('m [menit yang lalu]');
    } else if (hoursAgo < 24) {
        formattedDuration = moment.duration(hoursAgo, 'hours').format('h [jam yang lalu]');
    } else {
        formattedDuration = moment.duration(daysAgo, 'days').format('D [hari yang lalu]');
    }

    return formattedDuration;
};