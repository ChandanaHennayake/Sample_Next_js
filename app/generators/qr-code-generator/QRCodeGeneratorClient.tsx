"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { useToast } from "@/src/components/Toast";

type QRType = "url" | "text" | "wifi" | "email" | "phone";

export default function QRCodeGeneratorClient() {
  const [qrType, setQrType] = useState<QRType>("url");
  const [textValue, setTextValue] = useState<string>("https://unitnov.com");

  // WiFi fields
  const [wifiSsid, setWifiSsid] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");

  // Email fields
  const [emailTo, setEmailTo] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>("");

  // Phone field
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Styling options
  const [fgColor, setFgColor] = useState<string>("#ffffff");
  const [bgColor, setBgColor] = useState<string>("#0f1117");
  const [size, setSize] = useState<number>(300);
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");

  const [dataUrl, setDataUrl] = useState<string>("");
  const [svgString, setSvgString] = useState<string>("");
  const { toast } = useToast();

  // Compute raw payload based on type
  const payload = (() => {
    switch (qrType) {
      case "wifi":
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
      case "email":
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
      case "phone":
        return `tel:${phoneNumber}`;
      case "url":
      case "text":
      default:
        return textValue || "https://unitnov.com";
    }
  })();

  // Generate QR code whenever payload or styling changes
  useEffect(() => {
    if (!payload) return;

    // Generate PNG Data URL
    QRCode.toDataURL(payload, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorCorrection,
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error("QR Code Error:", err));

    // Generate SVG string
    QRCode.toString(payload, {
      type: "svg",
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorCorrection,
    })
      .then((svg) => setSvgString(svg))
      .catch((err) => console.error("SVG QR Error:", err));
  }, [payload, fgColor, bgColor, size, errorCorrection]);

  const downloadPNG = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `unitnov-qrcode-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    toast("PNG downloaded!");
  };

  const downloadSVG = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `unitnov-qrcode-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast("SVG downloaded!");
  };

  const copyToClipboard = async () => {
    if (!dataUrl) return;
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast("QR Code image copied to clipboard!");
    } catch {
      toast("Could not copy image directly", "error");
    }
  };

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      {/* Type Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: "url", label: "Website URL", icon: "🔗" },
          { id: "text", label: "Plain Text", icon: "📝" },
          { id: "wifi", label: "WiFi Login", icon: "📶" },
          { id: "email", label: "Email Address", icon: "✉️" },
          { id: "phone", label: "Phone Call", icon: "📞" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setQrType(tab.id as QRType)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              qrType === tab.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-[#1B2032] text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-5">
          {qrType === "url" && (
            <div>
              <label htmlFor="urlInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Target Website URL
              </label>
              <input
                id="urlInput"
                type="url"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {qrType === "text" && (
            <div>
              <label htmlFor="textInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Content or Message
              </label>
              <textarea
                id="textInput"
                rows={4}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Enter text or message to encode in the QR code..."
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          )}

          {qrType === "wifi" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="wifiSsidInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Network Name (SSID)
                </label>
                <input
                  id="wifiSsidInput"
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g. Home_WiFi_5G"
                  className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="wifiPasswordInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  id="wifiPasswordInput"
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="WiFi Network Password"
                  className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="wifiEncryptionSelect" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Security Encryption
                </label>
                <select
                  id="wifiEncryptionSelect"
                  value={wifiEncryption}
                  onChange={(e) => setWifiEncryption(e.target.value as "WPA" | "WEP" | "nopass")}
                  className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
          )}

          {qrType === "email" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="emailToInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Recipient Email
                </label>
                <input
                  id="emailToInput"
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="emailSubjectInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Subject Line
                </label>
                <input
                  id="emailSubjectInput"
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Feedback or Inquiry"
                  className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {qrType === "phone" && (
            <div>
              <label htmlFor="phoneInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Phone Number
              </label>
              <input
                id="phoneInput"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 555-019-2834"
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Color & Size Customization */}
          <div className="pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="fgColorInput" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                QR Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="fgColorInput"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-300">{fgColor}</span>
              </div>
            </div>

            <div>
              <label htmlFor="bgColorInput" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="bgColorInput"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-300">{bgColor}</span>
              </div>
            </div>

            <div>
              <label htmlFor="sizeSelect" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Size (px)
              </label>
              <select
                id="sizeSelect"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-lg px-2.5 py-1 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={200}>200 × 200</option>
                <option value={300}>300 × 300</option>
                <option value={500}>500 × 500</option>
                <option value={800}>800 × 800 (HD)</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-3">
              <label htmlFor="ecSelect" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Error Correction Level
              </label>
              <select
                id="ecSelect"
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as "L" | "M" | "Q" | "H")}
                className="w-full bg-[#1B2032] border border-white/10 rounded-lg px-2.5 py-1 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="L">Level L - Low (7% damaged recovery)</option>
                <option value="M">Level M - Medium (15% recovery, Recommended)</option>
                <option value="Q">Level Q - Quartile (25% recovery)</option>
                <option value="H">Level H - High (30% recovery, Best for print)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="lg:col-span-5 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-between text-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-4 block">
              Live QR Preview
            </span>

            {/* QR Image Box */}
            <div
              className="p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center transition-all"
              style={{ backgroundColor: bgColor }}
            >
              {dataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={dataUrl}
                  alt="Generated QR Code"
                  className="max-w-[220px] max-h-[220px] object-contain rounded-lg"
                />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-slate-500 text-xs">
                  Generating QR...
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 mt-3 max-w-xs truncate">
              Encodes: <span className="font-mono text-slate-200">{payload}</span>
            </p>
          </div>

          {/* Download Actions */}
          <div className="w-full mt-6 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={downloadPNG}
                className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-indigo-500/20"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={downloadSVG}
                className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors cursor-pointer border border-white/10"
              >
                Download SVG
              </button>
            </div>

            <button
              type="button"
              onClick={copyToClipboard}
              className="w-full py-2 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              Copy PNG to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
