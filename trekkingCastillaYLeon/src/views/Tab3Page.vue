<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Usersame</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
            <ion-card-header>
                <ion-card-title>
                    Rutero extremo
                </ion-card-title>
                <ion-card-subtitle>
                    13 rutas publicadas
                </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                    <ion-item>
                        <ion-label position="floating">Ruta 1</ion-label>
                        <ion-img src="https://siempredepaso.es/wp-content/uploads/2016/06/QA2282-1.jpg">
                        </ion-img>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Ruta 2</ion-label>
                        <ion-img src="https://img.remediosdigitales.com/b9b399/castillo-de-ponferrada-2/450_1000.jpg">
                        </ion-img>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Ruta 3</ion-label>
                        <ion-img src="https://www.sientecastillayleon.com/wp-content/uploads/2015/11/rutas-culturales-en-castilla-y-leon.jpg"> 
                        </ion-img>
                    </ion-item>
              </ion-list>
            </ion-card-content>
        </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});
</script>
