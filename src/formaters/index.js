import getStylish from './stylish.js';

export default function formating(data, option = 'stylish') {
  switch (option) {
    case 'stylish':
      return getStylish(data);
    default:
      throw new Error('Пошел Нахуй!');
  }
}
