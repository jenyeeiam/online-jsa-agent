import {replace} from "lodash";

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
    if(email){
      return re.test(email.toLowerCase());
    } else {
      return null
    }
}

export function validateYoutube(url) {
  let link;
  let urlError = '';
  if(/youtube/.test(url) || /youtu.be/.test(url)) {
    if(/watch/.test(url)) {
      link = replace(url, 'watch?v=', '');
      link = replace(link, 'youtube.com/', 'youtube.com/embed/');
    } else {
      link = replace(url, 'youtu.be.com/', 'www.youtube.com/embed/');
    };
    return link
  } else {
    urlError = 'Provide a valid YouTube link'
    return null
  }
}

export function validateParams(name, password) {
  return name.length > 0 && password.length > 5
}
