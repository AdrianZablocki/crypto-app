import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, isSignal } from '@angular/core';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

export const withLocalStorageSync = (storgeKey: string) =>signalStoreFeature(
  withState({}),
  withMethods((state) => {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    return {
      saveToLocalStorage(): void {
        const stateValue: Record<string, unknown> = {};
        for (const key in state as Record<string, unknown>) {
          const sliceSignal = (<Record<string, unknown>>state)[key];
          if (isSignal(sliceSignal)) {
            stateValue[key] = sliceSignal();
          }
        }

        window.localStorage.setItem(storgeKey, JSON.stringify(stateValue));
      },
      loadFromLocalStorage(): boolean {
        if (!isBrowser) {
          return false;
        }
        const stateValue = window.localStorage.getItem(storgeKey);
        if (!stateValue) {
          return false;
        }
        patchState(state, JSON.parse(stateValue));
        return true;
      }
    }
  })
)