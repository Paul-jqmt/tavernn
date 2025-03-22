


# Configuration et Exécution du Projet Tavernn API dans IntelliJ IDEA

Ce guide explique les étapes pour configurer et exécuter le projet Tavernn en utilisant IntelliJ IDEA.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

-   IntelliJ IDEA (Édition Community ou Ultimate)
-   Kit de Développement Java (JDK) 17
-   Serveur MySQL
-   Git (optionnel, pour le contrôle de version)

## Configuration du Projet

### 1. Cloner le Projet

#### Cloner avec GIT

1.  Depuis l'écran d'accueil d'IntelliJ, sélectionnez **Get from VCS**
2.  Entrez l'URL du dépôt
3.  Choisissez un emplacement de répertoire et cliquez sur **Clone**


### 2. Configurer Maven

IntelliJ devrait automatiquement détecter la configuration Maven à partir du fichier `pom.xml` :

1.  Attendez qu'IntelliJ indexe le projet et télécharge les dépendances
2.  Pour déclencher manuellement la synchronisation Maven :
    -   Cliquez droit sur le fichier `pom.xml`
    -   Sélectionnez **Maven → Reload Project**

### 3. Configurer la Connexion à la Base de Données

1.  Configurez une base de données MySQL avec les identifiants appropriés
2.  Créez un fichier `application.properties` ou `application.yml` dans le répertoire `src/main/resources` s'il n'est pas présent
3.  Configurez la connexion à la base de données :

properties

Copier

`spring.datasource.url=jdbc:mysql://localhost:3306/tavernn_db spring.datasource.username=nomUTILISATEUR
spring.datasource.password=motDePasse
spring.flyway.enabled=true spring.flyway.baseline-on-migrate=true 
spring.jpa.hibernate.ddl-auto=validate spring.jpa.show-sql=true`

### 4. Configurer l'Exécution

1.  Cliquez sur le bouton **Add Configuration** dans le coin supérieur droit
2.  Cliquez sur le bouton **+** et sélectionnez **Spring Boot**
3.  Configurez les paramètres d'exécution :
    -   Nom : `Tavernn`
    -   Classe principale : `api.tavernn.main` (comme spécifié dans pom.xml)
    -   Répertoire de travail : Sélectionnez le répertoire racine du projet
4.  Cliquez sur **Apply** et **OK**

## Exécution du Projet

### 1. Compiler le Projet

1.  Sélectionnez **Build → Build Project** dans le menu supérieur

### 2. Exécuter l'Application

1.  Sélectionnez la configuration d'exécution que vous avez créée dans le menu déroulant en haut à droite
2.  Cliquez sur le bouton vert **Run** (▶️)

### 3. Vérifier que l'Application est en Cours d'Exécution

1.  Surveillez la console IntelliJ pour voir les logs de démarrage de Spring Boot
2.  Recherchez un message indiquant que l'application a démarré
3.  Par défaut, l'application devrait être accessible à l'adresse `http://localhost:8080`