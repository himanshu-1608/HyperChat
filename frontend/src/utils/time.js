import moment from 'moment';

export const formatTime = time => {
    return moment(time).format('LT');
}