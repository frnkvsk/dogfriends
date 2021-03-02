
export default function useDate(created_on) {
  const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'];
  const [yr,mo,da] = created_on.slice(0,10).split('-');

  return `${months[+mo]} ${da}, ${yr}`;
}