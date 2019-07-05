//
//  RNHelloWorldEmitter.m
//  EventEmitterApp
//
//  Created by william on 7/5/19.
//

#import "RNHelloWorldEmitter.h"

@implementation RNHelloWorldEmitter
{
  BOOL _hasListeners;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
//  return @[@"EventReminder"];
    return @[@""];
}

// Will be called when this module's first listener is added.
- (void)startObserving
{
  _hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving
{
  _hasListeners = NO;
}

- (void)helloWorldEvent
{
  NSString *message = @"Hello, world!";
  if (_hasListeners) {
//    [self sendEventWithName:@"hello-world" body:@{@"message": message}];
    [self sendEventWithName:@"hello-world" body:@{@"message": message}];
  }
}

//- (void)calendarEventReminderReceived:(NSNotification *)notification
//{
//  NSString *eventName = notification.userInfo[@"name"];
//  [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
//}

@end
