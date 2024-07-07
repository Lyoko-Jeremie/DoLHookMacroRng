export {};

declare global {
    interface Window {
        modUtils: ModUtils;
        modSC2DataManager: SC2DataManager;

        modImgLoaderHooker: ImgLoaderHooker;

        hookMacroRng: HookMacroRng;

        jQuery: jQuery;
    }

    var Macro: {
        add: (name: string | string[], def) => any;
        delete: (name: string) => any;
        isEmpty: () => any;
        has: (name: string) => any;
        get: (name: string) => any;
    };

    interface Window {
        aaaaabbbbbccccc: (key: string) => string;
        ModWebpackExampleTs_patchLinkButton: (MacroRef: typeof Macro) => void;
    }

}
