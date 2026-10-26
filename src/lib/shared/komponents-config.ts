import { InjectionToken } from '@angular/core';

export type BoxPadding = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export interface KomponentsConfig {
  details?: {
    contentPadding?: Partial<BoxPadding>;
  };
}

export const KOMPONENTS_DEFAULTS = new InjectionToken<KomponentsConfig>('KOMPONENTS_DEFAULTS', {
  factory: () => ({}),
});

export function provideKomponentsConfig(config: KomponentsConfig) {
  return { provide: KOMPONENTS_DEFAULTS, useValue: config };
}
