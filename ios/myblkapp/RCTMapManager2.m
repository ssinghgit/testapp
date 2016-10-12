// RCTMapManager.m
#import <MapKit/MapKit.h>

#import "RCTViewManager.h"

#import "MyCustomView.h"

@interface RCTMap2Manager : RCTViewManager
@end

@implementation RCTMap2Manager

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(pitchEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(floorX, NSNumber)

- (UIView *)view
{
  MyCustomView * theView;
  theView = [[MyCustomView alloc] init];
  return theView;
  
   //return [[MKMapView alloc] init];
}

@end
