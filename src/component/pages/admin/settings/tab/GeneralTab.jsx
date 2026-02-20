import React from "react";
import SectionCard from "../SectionCard";
import SettingRow from "../SettingRow";
import ToggleSwitch from "../ToggleSwitch";
import { Upload } from "lucide-react";

export default function GeneralTab({ toggles, toggle }) {
  return (
    <div className="pt-3">
      {/* MAIN CARD */}
      <div
        className="
        bg-white rounded-2xl 
        shadow-sm border border-[#eef1f6] 
        p-8
      "
      >
        {/* TITLE */}
        <h3 className="text-[15px] font-bold text-[#1d2433] tracking-wide uppercase mb-6 flex items-center gap-2">
          <span className="w-1 h-4 bg-blue-600 rounded"></span>
          Platform Identity
        </h3>

        {/* FORM AREA */}
        <div className="space-y-6">
          {/* PLATFORM NAME */}
          <div>
            <label className="text-[11px] font-semibold text-[#7b8594] uppercase">
              Platform Name
            </label>
<br /><br />
            <input
              className="
                mt-1 w-full max-w-md h-11 rounded-xl
                bg-[#fafbfc] border border-[#e4e7ee]
                px-4 text-sm text-[#1f2937]
                focus:bg-white focus:border-blue-500
                focus:ring-2 focus:ring-blue-200 outline-none
                transition
              "
              defaultValue="AI Scholar"
            />
          </div>

          {/* TAGLINE */}
          <div>
            <label className="text-[11px] font-semibold text-[#7b8594] uppercase">
              Tagline
            </label>
<br />
            <input
              className="
                mt-1 w-full max-w-md h-11 rounded-xl
                bg-[#fafbfc] border border-[#e4e7ee]
                px-4 text-sm text-[#1f2937]
                focus:bg-white focus:border-blue-500
                focus:ring-2 focus:ring-blue-200 outline-none
                transition
              "
              defaultValue="Enterprise LMS for Modern Teams"
            />
          </div>

          {/* SUPPORT EMAIL */}
          <div>
            <label className="text-[11px] font-semibold text-[#7b8594] uppercase">
              Support Email
            </label>
<br />
            <input
              className="
                mt-1 w-full max-w-md h-11 rounded-xl
                bg-[#fafbfc] border border-[#e4e7ee]
                px-4 text-sm
                focus:bg-white focus:border-blue-500
                focus:ring-2 focus:ring-blue-200 outline-none
                transition
              "
              defaultValue="support@aischolar.io"
            />
          </div>

          {/* PLATFORM LOGO */}
          <div>
            <label className="text-[11px] font-semibold text-[#7b8594] uppercase">
              Platform Logo
            </label>
<br />
            <div className="flex items-center gap-4 mt-1">
              {/* LEFT LOGO BOX */}
              <div
                className="
                  w-12 h-12 rounded-xl
                  bg-blue-600 text-white 
                  flex items-center justify-center font-bold
                  shadow-sm
                "
              >
                AI
              </div>

              {/* UPLOAD BUTTON */}
              <button
                className="
                  h-10 px-4 rounded-xl border border-[#dee3ec] 
                  bg-white flex items-center gap-2 text-sm
                  hover:bg-blue-50 hover:border-blue-400
                  text-blue-700 transition
                "
              >
                <Upload className="w-4 h-4" />
                Upload Logo
              </button>
            </div>
          </div>

          {/* TIMEZONE */}
          <div>
            <label className="text-[11px] font-semibold text-[#7b8594] uppercase">
              Timezone
            </label>
<br />
            <select
              className="
                mt-1 w-full max-w-md h-11 rounded-xl
                bg-[#fafbfc] border border-[#e4e7ee]
                px-4 text-sm
                focus:bg-white focus:border-blue-500
                focus:ring-2 focus:ring-blue-200 outline-none
                transition
              "
            >
              {["UTC+5:30 (IST)", "UTC+0 GMT", "UTC-5 EST", "UTC+8 SGT"].map(
                (tz) => (
                  <option key={tz}>{tz}</option>
                ),
              )}
            </select>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-[#edf0f7] my-8"></div>

        {/* SWITCHES */}
        <div className="space-y-8">
          <div>
            <div className="font-semibold text-[15px] text-[#222]">
              Maintenance Mode
            </div>
            <div className="text-[12px] text-[#7b8594]">
              Temporarily disable access for all users except admins
            </div>

            <div className="mt-3">
              <ToggleSwitch
                checked={toggles.maintenanceMode}
                onChange={() => toggle("maintenanceMode")}
              />
            </div>
          </div>

          <div className="">
            <div className="font-semibold text-[15px] text-[#222]">
              Student Self-Registration
            </div>
            <div className="text-[12px] text-[#7b8594]">
              Allow students to register without admin approval
            </div>

            <div className="mt-3">
              <ToggleSwitch
                checked={toggles.studentRegistration}
                onChange={() => toggle("studentRegistration")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
