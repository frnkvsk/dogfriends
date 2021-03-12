
export default function useDate(created_on) {
  const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'];
  let [yr,mo,da] = ['00','00','0000'];
  if(created_on) {
    [yr,mo,da] = created_on.slice(0,10).split('-');
  } else {
    let today = new Date();    
    yr = today.getFullYear();
    da = String(today.getDate()).padStart(2, '0');
    mo = String(today.getMonth() + 1).padStart(2, '0'); 
  }
  return `${months[+mo]} ${da}, ${yr}`;
}