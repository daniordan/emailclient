// CHECKED

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

// This code snippet is an interceptor in Angular. It intercepts outgoing HTTP requests and allows you to modify or log them before they are sent. In this particular example, the intercept method takes in the original request (req) and the HttpHandler (next), and creates a modified request (modifiedReq) with the withCredentials property set to true. Finally, it returns next.handle(modifiedReq), which sends the modified request.
// This code snippet shows an interceptor in Angular that modifies outgoing HTTP requests.
// The intercept method takes in two parameters: req, which represents the original request being sent, and next, which is an instance of the HttpHandler class that allows you to continue the request chain.
// Inside the intercept method, the code creates a modified request by cloning the original request using the clone method. The clone method creates a copy of the request and allows you to modify its properties. In this case, the withCredentials property of the request is set to true. This property determines whether the request should include any cookies or authentication headers.
// After creating the modified request, the code returns next.handle(modifiedReq). This passes the modified request to the next handler in the request chain. The handle method of the HttpHandler class is responsible for sending the request.
// Overall, this interceptor allows you to modify or log outgoing requests before they are sent. In this example, it modifies the request by enabling the inclusion of credentials.
// We can have / wire multiple interceptors in the chain to be executed and the request will flow through each of the Interceptors wired in and eventually that request is going to have to be sent off to the actual request making function so the request actually gets sent off to the server.
//  We can use Interceptors to add some logs or some automatic error handling or something similar
//  the return is an Observable so we can add pipe and operators and subscribe the Observer etc.
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    // this "next" argument can be consider as being like the next interceptor that we need to run and eventually the actual request making function
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify or log the outgoing request
    //   we can't modify the request directly  (read-only request) so we need to clone it
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq);

    //  another way to use the return Observable by adding pipe and log / error handling, etc
    //   HttpEventType is an object with different properties tied to it that help us determine if this value is coming out of this observable is the sent event or the response event or any of other events
    //    this way we can take a look at the events that are coming out of our observable and handle them in some specific way
    // return next.handle(modifiedReq).pipe(
    //  filter if you want to check for a specific type of event
    //   filter((val) => val.type === HttpEventType.Sent),
    //   tap((val) => {
    //     if (val.type === HttpEventType.Sent) {
    //       console.log('Request was sent to server');
    //     }

    //     if (val.type === HttpEventType.Response) {
    //       console.log('Got a response from the API', val);
    //     }
    //   })
    // );
  }
}
