type DeviceType = "macOS" | "Windows" | "Linux" | "Android" | "iOS" | null;

export default function getDeviceType(): DeviceType {
  const device = useDevice();

  let deviceType: DeviceType = null;

  if (device.isMacOS) deviceType = "macOS";
  else if (device.isWindows) deviceType = "Windows";
  else if (device.isLinux) deviceType = "Linux";
  else if (device.isAndroid) deviceType = "Android";
  else if (device.isIos) deviceType = "iOS";

  return deviceType;
}
