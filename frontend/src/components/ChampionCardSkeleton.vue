<template>
     <v-card
        color="accent"
        light
        class="pb-4"
        elevation="2"
    >
        <v-row dense>
            <v-col cols="12" class="d-flex  align-center justify-center">
                    <v-skeleton-loader
                    type="avatar"
                    class="pa-6"
                    ></v-skeleton-loader>
            </v-col>
        </v-row>

        

        <v-card-text >
            <v-skeleton-loader
                        type="text"
                        class="mb-6 px-16"
                        ></v-skeleton-loader>
            <div class="subtitle-1">
                <v-row class="px-6">
                    <v-col cols="5">
                        <v-skeleton-loader
                            type="text"
                        ></v-skeleton-loader>
                    </v-col>
                    <v-col cols="7">
                        <v-skeleton-loader
                            type="text"
                        ></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
        </v-card-text>

        <v-skeleton-loader
                type="divider"
            ></v-skeleton-loader>
        <v-card-text>
        <v-row dense >
            <v-col class="px-15 mt-6" cols="12">
                <v-skeleton-loader
                    type="text"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="d-flex  align-center justify-center">
                <v-chip-group >
                    <v-skeleton-loader
                    type="chip"
                    class="mr-2"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                    type="chip"
                    ></v-skeleton-loader>
                </v-chip-group>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col class="px-15 mt-6" cols="12">
                <v-skeleton-loader
                    type="text"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="d-flex  align-center justify-center">
                <v-chip-group>
                    <v-skeleton-loader
                        type="chip"
                        class="mr-2"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                        type="chip"
                        class="mr-2"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                        type="chip"
                        class="mr-2"
                    ></v-skeleton-loader>
                </v-chip-group>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="6">
                <v-row dense> 
                    <v-col class="px-10 mt-6" cols="12">
                        <v-skeleton-loader
                            type="text"
                        ></v-skeleton-loader>
                    </v-col>
                    <v-col class="d-flex  align-center justify-center">
                        <v-skeleton-loader
                            type="chip"
                        ></v-skeleton-loader>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row dense> 
                        <v-col class="px-10 mt-6" cols="12">
                        <v-skeleton-loader
                            type="text"
                        ></v-skeleton-loader>
                    </v-col>
                    <v-col class="d-flex  align-center justify-center">
                        <v-skeleton-loader
                            type="chip"
                        ></v-skeleton-loader>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name: "ChampionCardSkeleton"
}
</script>