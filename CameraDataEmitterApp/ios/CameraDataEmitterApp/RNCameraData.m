//
//  RNCameraData.m
//  CameraDataEmitterApp
//
//  Created by william on 7/18/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNCameraData.h"
#import <React/RCTLog.h>
#import <Foundation/Foundation.h>

@implementation RNCameraData
{
  BOOL _hasListeners;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"camera-data"];
}

// Will be called when this module's first listener is added.
- (void)startObserving
{
  _hasListeners = YES;
  [self emitEvent];  // invoke the event
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving
{
  _hasListeners = NO;
}

- (void)emitEvent
{
  RCTLogInfo(@"Emitting an event");
  NSString *message = @"WIP - put camera data here";
  if (_hasListeners) {
    [self sendEventWithName:@"camera-data" body:@{@"message": message}];
  }
}

RCT_EXPORT_METHOD(getEvent)
{
  RCTLogInfo(@"Getting request for event in getEvent()");
  [self emitEvent];  // invoke the event
}

@end
