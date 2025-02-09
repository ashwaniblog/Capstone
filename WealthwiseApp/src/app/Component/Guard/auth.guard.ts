import { Injectable } from '@angular/core';

import { CanActivateFn } from '@angular/router';


export const authGuard : CanActivateFn = (route , state) => {
  return sessionStorage.getItem('username') ? true : false;
}
