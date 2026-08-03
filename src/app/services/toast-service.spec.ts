import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast-service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty toasts list', () => {
    expect(service.toasts.length).toBe(0);
  });

  it('should add a toast when show is called', () => {
    service.show('Test message', { classname: 'bg-success' });
    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0].textOrTpl).toBe('Test message');
    expect(service.toasts[0].classname).toBe('bg-success');
  });

  it('should remove a specific toast when remove is called', () => {
    const toast1 = { textOrTpl: 'Toast 1' };
    const toast2 = { textOrTpl: 'Toast 2' };
    service.toasts = [toast1, toast2];

    service.remove(toast1);
    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0]).toBe(toast2);
  });

  it('should clear all toasts when clear is called', () => {
    service.show('Toast 1');
    service.show('Toast 2');
    expect(service.toasts.length).toBe(2);

    service.clear();
    expect(service.toasts.length).toBe(0);
  });
});
