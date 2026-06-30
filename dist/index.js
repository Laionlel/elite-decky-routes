const manifest = {"name":"Elite Decky Routes"};
const API_VERSION = 2;
const internalAPIConnection = window.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
if (!internalAPIConnection) {
    throw new Error('[@decky/api]: Failed to connect to the loader as as the loader API was not initialized. This is likely a bug in Decky Loader.');
}
let api;
try {
    api = internalAPIConnection.connect(API_VERSION, manifest.name);
}
catch {
    api = internalAPIConnection.connect(1, manifest.name);
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version 1. Some features may not work.`);
}
if (api._version != API_VERSION) {
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version ${api._version}. Some features may not work.`);
}
const callable = api.callable;
const toaster = api.toaster;
const definePlugin = (fn) => {
    return (...args) => {
        return fn(...args);
    };
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = SP_REACT.createContext && /*#__PURE__*/SP_REACT.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/SP_REACT.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/SP_REACT.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var {
        attr,
        size,
        title
      } = props,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/SP_REACT.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/SP_REACT.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/SP_REACT.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaShip (props) {
  return GenIcon({"attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M496.616 372.639l70.012-70.012c16.899-16.9 9.942-45.771-12.836-53.092L512 236.102V96c0-17.673-14.327-32-32-32h-64V24c0-13.255-10.745-24-24-24H248c-13.255 0-24 10.745-24 24v40h-64c-17.673 0-32 14.327-32 32v140.102l-41.792 13.433c-22.753 7.313-29.754 36.173-12.836 53.092l70.012 70.012C125.828 416.287 85.587 448 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24 61.023 0 107.499-20.61 143.258-59.396C181.677 487.432 216.021 512 256 512h128c39.979 0 74.323-24.568 88.742-59.396C508.495 491.384 554.968 512 616 512c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24-60.817 0-101.542-31.001-119.384-75.361zM192 128h256v87.531l-118.208-37.995a31.995 31.995 0 0 0-19.584 0L192 215.531V128z"},"child":[]}]})(props);
}

const loadFromFolder = callable("load_from_folder");
const listFiles = callable("list_files");
const getState = callable("get_state");
const advance = callable("advance");
const goBack = callable("go_back");
const copyToClipboard = callable("copy_to_clipboard");
const clearRoute = callable("clear_route");
const jumpToSystem = callable("jump_to_system");
const getRouteFolder = callable("get_route_folder");
const saveFolderPath = callable("set_route_folder");
function Content() {
    const [stops, setStops] = SP_REACT.useState([]);
    const [currentIndex, setCurrentIndex] = SP_REACT.useState(0);
    const [loadedFile, setLoadedFile] = SP_REACT.useState("");
    const [routeFolder, setRouteFolder] = SP_REACT.useState("");
    const [loading, setLoading] = SP_REACT.useState(false);
    const [error, setError] = SP_REACT.useState("");
    const [availableFiles, setAvailableFiles] = SP_REACT.useState([]);
    const [showPicker, setShowPicker] = SP_REACT.useState(false);
    const [showFinder, setShowFinder] = SP_REACT.useState(false);
    const [findQuery, setFindQuery] = SP_REACT.useState("");
    const [showOptions, setShowOptions] = SP_REACT.useState(false);
    const [autoAdvance, setAutoAdvance] = SP_REACT.useState(false);
    const [folderInput, setFolderInput] = SP_REACT.useState("");
    SP_REACT.useEffect(() => {
        getState().then((state) => {
            setRouteFolder(state.route_folder);
            if (state.stops.length > 0) {
                setStops(state.stops);
                setCurrentIndex(state.current_index);
                setLoadedFile(state.loaded_file);
            }
            else {
                handleLoad("", true);
            }
        });
    }, []);
    const refreshFileList = async () => {
        const result = await listFiles();
        setAvailableFiles(result.files ?? []);
        return result.files ?? [];
    };
    const handleLoad = async (filename = "", silent = false) => {
        setLoading(true);
        setError("");
        const result = await loadFromFolder(filename);
        setLoading(false);
        if (result.success) {
            const state = await getState();
            setStops(state.stops);
            setCurrentIndex(0);
            setLoadedFile(result.filename ?? "");
            setShowPicker(false);
            if (!silent) {
                toaster.toast({ title: "Route loaded", body: `${result.total} systems from ${result.filename}` });
            }
        }
        else {
            setError(result.error ?? "Unknown error");
        }
    };
    const handleShowPicker = async () => {
        await refreshFileList();
        setShowPicker(true);
    };
    const handleShowOptions = async () => {
        const folder = await getRouteFolder();
        setFolderInput(folder);
        setShowOptions(true);
    };
    const handleSaveFolder = async () => {
        if (!folderInput.trim())
            return;
        const result = await saveFolderPath(folderInput.trim());
        if (result.success) {
            setRouteFolder(folderInput.trim());
            toaster.toast({ title: "Folder saved", body: folderInput.trim() });
        }
        else {
            toaster.toast({ title: "Invalid path", body: result.error ?? "Could not create folder" });
        }
    };
    const handleFind = async () => {
        if (!findQuery.trim())
            return;
        const result = await jumpToSystem(findQuery.trim());
        if (result.success) {
            setCurrentIndex(result.current_index);
            setShowFinder(false);
            setFindQuery("");
        }
        else {
            toaster.toast({ title: "Not found", body: result.error ?? "System not found" });
        }
    };
    const handleCopy = async () => {
        const system = stops[currentIndex]?.system;
        if (!system)
            return;
        const result = await copyToClipboard(system);
        if (result.success) {
            toaster.toast({ title: "Copied!", body: system });
            if (autoAdvance)
                await handleNext();
        }
        else {
            toaster.toast({ title: "Copy failed", body: result.error ?? "Unknown error" });
        }
    };
    const handleNext = async () => {
        const result = await advance();
        setCurrentIndex(result.current_index);
        if (!result.success) {
            toaster.toast({ title: "Route complete!", body: "You've reached the destination" });
        }
    };
    const handleBack = async () => {
        const result = await goBack();
        setCurrentIndex(result.current_index);
    };
    const handleClear = async () => {
        await clearRoute();
        setStops([]);
        setCurrentIndex(0);
        setLoadedFile("");
        setError("");
    };
    const currentStop = stops[currentIndex];
    const nextStop = stops[currentIndex + 1];
    const hasRoute = stops.length > 0;
    const isLast = currentIndex >= stops.length - 1;
    const hasBodies = currentStop?.bodies?.length > 0;
    const hasFlags = currentStop?.neutron || currentStop?.refuel || currentStop?.inject;
    const isRiches = stops.some(s => s.scan_value > 0 || s.mapping_value > 0);
    const earnedScan = stops.slice(0, currentIndex).reduce((a, s) => a + (s.scan_value ?? 0), 0);
    const earnedMapping = stops.slice(0, currentIndex).reduce((a, s) => a + (s.mapping_value ?? 0), 0);
    const totalScan = stops.reduce((a, s) => a + (s.scan_value ?? 0), 0);
    const totalMapping = stops.reduce((a, s) => a + (s.mapping_value ?? 0), 0);
    const fmt = (n) => n.toLocaleString() + " cr";
    if (showOptions) {
        return (SP_JSX.jsxs(DFL.PanelSection, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: "Auto-advance on copy", description: "Automatically move to the next system after copying", checked: autoAdvance, onChange: setAutoAdvance }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.TextField, { label: "Routes folder", value: folderInput, onChange: (e) => setFolderInput(e.target.value) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleSaveFolder, children: "Save Folder" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => setShowOptions(false), children: "Back" }) })] }));
    }
    if (showFinder) {
        return (SP_JSX.jsxs(DFL.PanelSection, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.TextField, { label: "System name", value: findQuery, onChange: (e) => setFindQuery(e.target.value) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleFind, children: "Go to System" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => { setShowFinder(false); setFindQuery(""); }, children: "Cancel" }) })] }));
    }
    if (showPicker) {
        return (SP_JSX.jsxs(DFL.PanelSection, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx("div", { style: { color: "#8b9bb4", fontSize: "11px" }, children: "Select a route file:" }) }), availableFiles.length === 0 && (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx("div", { style: { color: "#ff6b6b", fontSize: "12px" }, children: "No files found in folder" }) })), availableFiles.map((f) => (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => handleLoad(f), children: f }) }, f))), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => setShowPicker(false), children: "Cancel" }) })] }));
    }
    return (SP_JSX.jsxs(DFL.PanelSection, { children: [hasRoute && (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { children: [SP_JSX.jsx("div", { style: { color: "#8b9bb4", fontSize: "11px" }, children: loadedFile }), SP_JSX.jsxs("div", { style: { color: "#5a6a80", fontSize: "10px", marginTop: "2px", letterSpacing: "0.05em" }, children: ["STOP ", currentIndex + 1, " OF ", stops.length] })] }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx("div", { style: { color: "#ffffff", fontSize: "15px", fontWeight: "bold", wordBreak: "break-word" }, children: currentStop?.system }) }), hasFlags && (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: [currentStop.neutron && (SP_JSX.jsx("span", { style: { background: "#4a90d9", color: "#fff", fontSize: "11px", padding: "2px 7px", borderRadius: "3px" }, children: "Neutron boost" })), currentStop.refuel && (SP_JSX.jsx("span", { style: { background: "#c8a84b", color: "#000", fontSize: "11px", padding: "2px 7px", borderRadius: "3px" }, children: "Refuel" })), currentStop.inject && (SP_JSX.jsx("span", { style: { background: "#5cb85c", color: "#fff", fontSize: "11px", padding: "2px 7px", borderRadius: "3px" }, children: "Inject" }))] }) })), hasBodies && (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx("div", { style: { color: "#c8a84b", fontSize: "12px", lineHeight: "1.6" }, children: currentStop.bodies.map((b, i) => (SP_JSX.jsxs("div", { children: ["\u00B7 ", b] }, i))) }) })), isRiches && (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: { fontSize: "11px", lineHeight: "1.7" }, children: [SP_JSX.jsxs("div", { style: { color: "#8b9bb4" }, children: ["Scan: ", SP_JSX.jsx("span", { style: { color: "#e8e8e8" }, children: fmt(earnedScan) }), SP_JSX.jsxs("span", { style: { color: "#5a6a80" }, children: [" / ", fmt(totalScan)] })] }), SP_JSX.jsxs("div", { style: { color: "#8b9bb4" }, children: ["Map: ", SP_JSX.jsx("span", { style: { color: "#e8e8e8" }, children: fmt(earnedMapping) }), SP_JSX.jsxs("span", { style: { color: "#5a6a80" }, children: [" / ", fmt(totalMapping)] })] })] }) })), nextStop && (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: { color: "#8b9bb4", fontSize: "12px" }, children: ["Next: ", nextStop.system, nextStop.distance > 0 && ` · ${nextStop.distance.toFixed(1)} ly`] }) })), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleCopy, children: "Copy System Name" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleNext, children: isLast ? "Route Complete" : "Done — Next System" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleBack, children: "Previous System" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => setShowFinder(true), children: "Find System" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleShowPicker, children: "Switch Route" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleClear, children: "Clear Route" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleShowOptions, children: "Options" }) })] })), !hasRoute && (SP_JSX.jsxs(SP_JSX.Fragment, { children: [error ? (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx("div", { style: { color: "#ff6b6b", fontSize: "12px", wordBreak: "break-word" }, children: error }) })) : null, SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs("div", { style: { color: "#8b9bb4", fontSize: "11px", wordBreak: "break-word" }, children: ["Drop a Spansh CSV into:", "\n", routeFolder] }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleShowPicker, children: loading ? "Loading..." : "Load Route" }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: handleShowOptions, children: "Options" }) })] }))] }));
}
var index = definePlugin(() => {
    return {
        name: "Elite Decky Routes",
        titleView: SP_JSX.jsx("div", { className: DFL.staticClasses.Title, children: "Elite Decky Routes" }),
        content: SP_JSX.jsx(Content, {}),
        icon: SP_JSX.jsx(FaShip, {}),
        onDismount() { },
    };
});

export { index as default };
//# sourceMappingURL=index.js.map
