import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const VIDEO_PLAYER_KEY = 'videoplayer-current-time';

let timeUpdate = event => {
  localStorage.setItem(VIDEO_PLAYER_KEY, event.seconds);
};

player.on('timeupdate', throttle(timeUpdate, 1000));

const currentTime = localStorage.getItem(VIDEO_PLAYER_KEY);
if (currentTime) player.setCurrentTime(currentTime);
