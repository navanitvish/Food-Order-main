#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyD9gQiOP8vVtzDFjLjF59SL2MlcHXhjAsA"]; // add this line using the api key obtained from Google Console
  self.moduleName = @"foodDeliverApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  NSMutableDictionary *userInfo = [[NSMutableDictionary alloc] init];
  [userInfo setObject:options forKey:@"options"];
  [userInfo setObject:url forKey:@"openUrl"];
  [[NSNotificationCenter defaultCenter] postNotificationName: @"ApplicationOpenURLNotification" object:nil userInfo:userInfo];
  return YES;
}

@end
