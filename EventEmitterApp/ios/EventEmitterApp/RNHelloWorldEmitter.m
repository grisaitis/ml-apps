//
//  RNHelloWorldEmitter.m
//  EventEmitterApp
//
//  Created by william on 7/5/19.
//

#import "RNHelloWorldEmitter.h"
#import <React/RCTLog.h>

@implementation RNHelloWorldEmitter
{
  BOOL _hasListeners;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
//  return @[@"EventReminder"];
    return @[@"hello-world"];
}

// Will be called when this module's first listener is added.
- (void)startObserving
{
  _hasListeners = YES;
  [self helloWorldEvent];  // invoke the event
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving
{
  _hasListeners = NO;
}

- (void)helloWorldEvent
{
  RCTLogInfo(@"Inside helloWorldEvent()");
  NSString *message = @"Hello, world! From the RNHelloWorldEmitter";
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
