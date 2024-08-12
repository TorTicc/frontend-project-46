import getStylish from './stylish.js';
import getPlain from './plain.js';

export default function formating(data, option = 'stylish') {
  switch (option) {
    case 'stylish':
      return getStylish(data);
    case 'plain':
      return getPlain(data);
    default:
      throw new Error('Пошел Нахуй!');
  }
}
