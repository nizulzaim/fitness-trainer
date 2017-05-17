<template>
    <div class="appbar-padding" v-wheight>
        <page-container>
            <cards>
                <cards-image :img="image">
                    <div class="row center-xs middle-xs" style="z-index: 100; height: 100%; width: 100%; position: absolute; top: 0; left: 0;">
                        <div class="col-xs-fluid-24">
                            <div class="button-center-container">
                                <raised-button @click="addFile" v-ripple>
                                    <icon name="upload"></icon> {{buttonAddText}}</raised-button>
                            </div>
                        </div>
                    </div>
                </cards-image>
                <input type="file" ref="inputFile" id="inputFile" @change="upload">
                <form @submit.prevent="addTreatment">
                    <cards-content>
                        <div>Treatment Information</div>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-24">
                                <textfield v-model="parse.title" placeholder="Title"></textfield>
                                <textfield type="multiline" v-model="parse.info" placeholder="Description"></textfield>
                            </div>
                        </div>
                    </cards-content>
                    <divider></divider>
                    <cards-content>
                        <div>Sympthom</div>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-24" v-for="(key, index) in parse.sympthom">
                                <textfield type="multiline"  v-model="parse.sympthom[index]" :placeholder="'Sympthom ' + (index+1)"></textfield>
                            </div>
                            <icon-button name="plus" @click="addSympthom"></icon-button>
                        </div>
                    </cards-content>
                    <divider></divider>
                    <cards-content>
                        <div>First Aid</div>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-24" v-for="(key, index) in parse.firstAid">
                                <textfield type="multiline" v-model="parse.firstAid[index]" :placeholder="'First Aid ' + (index+1)"></textfield>
                            </div>
                            <icon-button name="plus" @click="addFirstAid"></icon-button>
                        </div>
                    </cards-content>
                    <divider></divider>
                    <cards-content>
                        <div>Prevention</div>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-24" v-for="(key, index) in parse.prevention">
                                <textfield type="multiline" v-model="parse.prevention[index]" :placeholder="'Prevention ' + (index+1)"></textfield>
                            </div>
                            <icon-button name="plus" @click="addPrevention"></icon-button>
                        </div>
                    </cards-content>
                    <divider></divider>
                    <cards-action>
                        <div class="pull-right">
                            <color-button type="submit" class="primary" v-ripple>
                                <icon name="plus"></icon> Create</color-button>
                        </div>
                    </cards-action>
                </form>
            </cards>
        </page-container>
        <loader ref="loader"></loader>
    </div>
</template>

<script>
    import {Images} from "/imports/model/Images";
    import {Treatment} from "/imports/model/Treatment";

    export default {
        data() {
            return {
                image: "",
                parse: {
                    imageId: "",
                    title: "",
                    info: "",
                    sympthom: [],
                    firstAid: [],
                    prevention: [],
                }
            }
        },
        mounted() {
            this.image = "";
            this.parse.imageId = "";
            this.addSympthom();
            this.addFirstAid();
            this.addPrevention();
        },
        methods: {
            addFile() {
                this.$refs.inputFile.click();
            },
            addSympthom() {
                return this.parse.sympthom.push("");
            },
            addFirstAid() {
                return this.parse.firstAid.push("");
            },
            addPrevention() {
                return this.parse.prevention.push("");
            },
            addTreatment() {
                let t = new Treatment();
                this.$refs.loader.enable();
                this.parse.sympthom.forEach((item, index)=> {
                    if (item === "") {
                        this.parse.sympthom.splice(index, 1);
                    }
                })

                this.parse.firstAid.forEach((item, index)=> {
                    if (item === "") {
                        this.parse.firstAid.splice(index, 1);
                    }
                })

                this.parse.prevention.forEach((item, index)=> {
                    if (item === "") {
                        this.parse.prevention.splice(index, 1);
                    }
                })

                if (this.parse.sympthom.length === 0) {
                    this.$refs.loader.disable();
                    return this.$snackbar.run("Please enter at least one sympthom", ()=>{}, "Ok", "error");
                }

                if (this.parse.firstAid.length === 0) {
                    this.$refs.loader.disable();
                    return this.$snackbar.run("Please enter at least one first aid", ()=>{}, "Ok", "error");
                }

                t.callMethod("create", this.parse, (err, res)=> {
                    this.$refs.loader.disable();
                    if (err) {
                        return this.$snackbar.run("Error when creating new treatment", ()=>{}, "Ok", "error");
                    }
                    this.$snackbar.run("Successfully create new treatment");
                    return this.$router.replace("/dashboard/self-treatment");
                })
            },
            upload() {
                let self = this;
                let fileInput = this.$refs.inputFile;

                if (fileInput.files && fileInput.files[0]) {
                    var upload = Images.insert({
                        file: fileInput.files[0],
                        streams: 'dynamic',
                        chunkSize: 'dynamic'
                    }, false);

                    upload.on('start',()=>{
                        this.$refs.loader.toggle();
                    });

                    upload.on('end', (error, fileObj) => {
                        if (error) {
                            return this.$snackbar.run('Error during upload: ' + error.reason, ()=> {}, "OK", "error");
                        } 
                        this.$snackbar.run('File "' + fileObj.name + '" successfully uploaded');
                        this.parse.imageId = fileObj._id;
                        setTimeout(()=> {
                            this.$refs.loader.toggle();
                        }, 300)
                    });
                    upload.start();
                }
            }
        },
        meteor: {
            subscribe:{
                imageById() {
                    if (this.parse.imageId ) {
                        return [this.parse.imageId];
                    }
                    return [""];
                },
            },
            images() {
                let image = Images.findOne();
                if (image) {
                    this.image = image.link();
                }
                return image;
            }
        },
        computed: {
            buttonAddText() {
                if (this.image) {
                    return "Change Photo";
                }
                return "Add Photo";
            }
        },
        
    }
</script>

<style>
    #inputFile {
        display: none;
    }
</style>
