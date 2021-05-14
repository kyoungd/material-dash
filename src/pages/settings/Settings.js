import SettingsPassword from './components/SettingsPassword';
import SettingsSupportResistance from "./components/SettingsSupportResistance";
import SettingsGapFill from "./components/SettingsGapFill";
import { useUserState, useUserDispatch } from "../../context/UserContext";

export default function Settings() {
  var userDispatch = useUserDispatch();
  var userState = useUserState();

  return (
    <div>
      <SettingsSupportResistance settings={userState.settings} dispatch={userDispatch} />
      <SettingsGapFill />
      <SettingsPassword />
    </div>
  );
}
