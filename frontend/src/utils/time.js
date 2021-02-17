import moment from 'moment';

export const formatTime = time => {
    if(time === 'online')
        return time;
    return moment(time).format('LT');
}