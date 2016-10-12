//
//  MyCustomView.m
//  myblkapp
//
//  Created by Santosh Singh on 10/11/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "MyCustomView.h"

@implementation MyCustomView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

{
  UIColor *squareColor;
}

- (void)setPitchEnabled:(BOOL)pitchEnabled
{
  squareColor= (pitchEnabled)  ? [UIColor redColor] : [UIColor greenColor];
  [self setNeedsDisplay];
}

- (void)drawRect:(CGRect)rect
{
  [squareColor setFill];
  CGContextFillRect(UIGraphicsGetCurrentContext(), rect); 
}



@end
