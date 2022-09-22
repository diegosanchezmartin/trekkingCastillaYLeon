import { ComponentCustomProperties } from "vue";
import { store } from "./store";

declare module '@vue/runtime-core' {
    interface state {
        count: number
    }

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}