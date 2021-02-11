import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to add a message', inject([MessageService], (service: MessageService) => {
    service.add('this is test message');
    const messages = service.getMessages();
    expect(messages[0]).toEqual('this is test message');
  }));

  it('should be able to retrieve the stored messsage', inject([MessageService], (service: MessageService) => {
    service.add('this is test message');
    service.add('another message');
    const messages = service.getMessages();
    expect(messages.length).toEqual(2);
  }));

  it('should be able to clear the logged messages', inject([MessageService], (service: MessageService) => {
    service.add('this is test message');
    service.clear();
    const messages = service.getMessages();
    expect(messages.length).toEqual(0);
  }));
});
