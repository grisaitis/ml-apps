#import "RNAveragePixelEmitter.h"

@implementation RNAveragePixelEmitter
{
  BOOL _hasListeners;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"video-progress"];
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

- (void)onVideoProgress
{
  CGFloat progress = 0.333333;
  if (_hasListeners) {
    [self sendEventWithName:@"video-progress" body:@{ @"progress": @(progress) }];
  }
}

@end
