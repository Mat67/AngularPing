import { TestBed } from '@angular/core/testing';
import { RepositoryService } from './repository.service';

describe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getListeMatchesId', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should return empty array when localStorage key is not set', () => {
      const result = service.getListeMatchesId();
      expect(result).toEqual([]);
    });

    it('should return parsed array when localStorage key contains JSON data', () => {
      const mockIds = ['id-1', 'id-2', 'id-3'];
      localStorage.setItem('eps-matchs', JSON.stringify(mockIds));

      const result = service.getListeMatchesId();
      expect(result).toEqual(mockIds);
    });
  });

  describe('ModifierSignature', () => {
    it('should call ws.next with ModifierSignature message when ws is initialized', () => {
      const mockWs = { next: jasmine.createSpy('next') };
      service.ws = mockWs as any;

      service.ModifierSignature('match-123', 'equipe-A', 'data:image/png;base64,...');

      expect(mockWs.next).toHaveBeenCalledWith({
        message: 'ModifierSignature',
        data: {
          matchId: 'match-123',
          equipeId: 'equipe-A',
          signature: 'data:image/png;base64,...'
        }
      });
    });
  });

  describe('supprimerMatch', () => {
    it('should send supprimerMatch message over websocket', () => {
      const mockWs = { next: jasmine.createSpy('next') };
      service.ws = mockWs as any;

      service.supprimerMatch('match-456');

      expect(mockWs.next).toHaveBeenCalledWith({
        message: 'supprimerMatch',
        data: 'match-456'
      });
    });
  });
});
