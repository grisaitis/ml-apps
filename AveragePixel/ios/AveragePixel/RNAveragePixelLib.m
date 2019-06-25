#import "RNAveragePixelLib.h"
#import <React/RCTLog.h>

@implementation RNAveragePixelLib

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"In RNAveragePixelLib %@ at %@", name, location);
}

@end
