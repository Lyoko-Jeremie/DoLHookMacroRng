import {isFunction, isNil, isNumber, isArray} from 'lodash';
import type {LogWrapper} from "../../../dist-BeforeSC2/ModLoadController";
import type {SC2DataManager} from "../../../dist-BeforeSC2/SC2DataManager";
import type {ModUtils} from "../../../dist-BeforeSC2/Utils";

export class HookMacroRng {
    protected logger: LogWrapper;

    constructor(
        public thisWindow: Window,
        public gSC2DataManager: SC2DataManager,
        public gModUtils: ModUtils,
    ) {
        this.logger = this.gModUtils.getLogger();
    }

    private originFunc?: Function;

    initHook(MacroRef: typeof Macro) {
        console.log('[HookMacroRng] initHook() start');
        if (this.originFunc) {
            console.error('[HookMacroRng] initHook() already init');
            this.logger.error(`[HookMacroRng] initHook() already init`);
            return;
        }

        const icon = MacroRef.get('rng');
        if (!icon) {
            console.error('[HookMacroRng] initHook() cannot find macro [rng]');
            this.logger.error(`[HookMacroRng] initHook() cannot find macro [rng]`);
            return;
        }
        const h = icon.OriginHandlerPassageQBalance;
        if (!h && !isFunction(h)) {
            console.error('[HookMacroRng] initHook() cannot find macro [rng] handle', [icon, h]);
            this.logger.error(`[HookMacroRng] initHook() cannot find macro [rng] handle`);
            return;
        }

        this.originFunc = h;

        const thisRef = this;

        MacroRef.delete('rng');
        MacroRef.add("rng", {
            handler() {

                let min = 1;
                let max = 100;
                if (this.args.length === 2) {
                    [min, max] = this.args;
                } else if (this.args.length === 1) {
                    max = this.args[0];
                }

                const rr = thisRef.tryGetNextFixRng(min, max, this.args);
                if (!isNil(rr) && isNumber(rr)) {
                    console.log('[HookMacroRng] generated rng : ', []);
                    V.rng = rr;
                    return;
                } else {
                    thisRef.originFunc?.call(this);
                }
            },
        });
        console.log('[HookMacroRng] initHook() [rng] ok');
        this.logger.log(`[HookMacroRng] initHook() [rng] ok`);
    }

    private rngList: number[] = [];
    private rngHook?: (min: number, max: number, args: any[]) => number | undefined;

    private tryGetNextFixRng(min: number, max: number, args: any[]): number | undefined {
        if (this.rngList.length > 0) {
            const r = this.rngList.shift();
            if (this.rngList.length === 1) {
                console.log('[HookMacroRng] tryGetNextFixRng() this is the last number in rngList:', [r]);
            }
            if (r) {
                return r;
            }
        }
        try {
            if (this.rngHook) {
                return this.rngHook(min, max, args);
            }
        } catch (e) {
            console.error('[HookMacroRng] tryGetNextFixRng() hook error:', [e, this.rngHook, min, max, args]);
        }
        return undefined;
    }

    setRngList(list?: number[]) {
        if (!list || !isArray(list) || list.length === 0) {
            list = [];
        }
        console.log('[HookMacroRng] setRngList()', [list]);
        this.rngList = list;
        console.log('[HookMacroRng] setRngHook() clear hook', [this.rngHook]);
        this.rngHook = undefined;
    }

    setRngHook(hook?: ((min: number, max: number) => number) | undefined | null) {
        if (hook && isFunction(hook)) {
            console.log('[HookMacroRng] setRngHook() set hook', [hook]);
            this.rngHook = hook;
            console.log('[HookMacroRng] setRngHook() clear list', [this.rngList]);
            this.rngList = [];
        } else {
            console.log('[HookMacroRng] setRngHook() clear hook', [hook]);
            this.rngHook = undefined;
        }
    }
}

window.hookMacroRng = new HookMacroRng(
    window,
    window.modSC2DataManager,
    window.modUtils,
);
