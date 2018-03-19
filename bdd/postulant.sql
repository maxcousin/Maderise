-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Ven 16 Mars 2018 à 16:15
-- Version du serveur :  5.7.14
-- Version de PHP :  7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `postulant`
--

-- --------------------------------------------------------

--
-- Structure de la table `connaissance`
--

CREATE TABLE `connaissance` (
  `code_c` bigint(20) UNSIGNED NOT NULL,
  `intitule` varchar(200) NOT NULL,
  `type` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `connaissance`
--

INSERT INTO `connaissance` (`code_c`, `intitule`, `type`) VALUES
(243, 'Microstation / CAD TDO', 'I'),
(244, 'Plantspace', 'I'),
(245, 'Support Modeleur', 'I'),
(246, 'Autopipe Vessel', 'I'),
(247, 'ISO Extractor', 'I'),
(248, 'Autocad', 'I'),
(249, 'Robot Milenium', 'I'),
(250, 'Sicap', 'I'),
(251, 'FluidFlow', 'I'),
(252, 'Caesar II', 'I'),
(253, 'Magics', 'I'),
(254, 'MS Project', 'I'),
(255, 'EBP Gestion Commerciale', 'I'),
(256, 'Conduite d\'affaires - Réunion lancement/avancement', 'T'),
(257, 'Conduite d\'affaires - Réalisation planning et reporting', 'T'),
(258, 'Conduite d\'affaires - Revue maquette', 'T'),
(259, 'Conduite d\'affaires - MAJ documents (PIDS, ISOS, Plans, ...)', 'T'),
(260, 'Conduite d\'affaires - Vérification documents (PIDS, ISOS, Plans, ...)', 'T'),
(261, 'Conduite d\'affaires - Constitution de DFA', 'T'),
(262, 'Conduite d\'affaires - Contrôle DFA', 'T'),
(263, 'Tuyauterie/Chaudronnerie - Relevés', 'T'),
(264, 'Tuyauterie/Chaudronnerie - Modélisation', 'T'),
(265, 'Tuyauterie/Chaudronnerie - Calculs', 'T'),
(266, 'Tuyauterie/Chaudronnerie - Vérification spécification matériel', 'T'),
(267, 'Structure - Relevés', 'T'),
(268, 'Structure - Modélisation', 'T'),
(269, 'Structure - Calculs', 'T'),
(270, 'Structure - Calcul au séisme', 'T'),
(271, 'Génie Civil - Relevés', 'T'),
(272, 'Génie Civil - Modélisation', 'T'),
(273, 'Génie Civil - Vérification spécification travaux', 'T'),
(274, 'Suivi de Chantier', 'T'),
(275, 'CA Projet ARKEMA', 'T'),
(276, 'CA Projet TOTAL Pau', 'T'),
(277, 'CA Clé en main', 'T'),
(278, 'Process', 'T'),
(279, 'Audit Interne', 'T'),
(280, 'Management par projet', 'T'),
(281, 'Arbre des causes', 'T'),
(282, 'Compagnonage/Formation interne/Tuteur(métier sécurité)', 'T'),
(283, 'GSI Niveau 1', 'H'),
(284, 'GSI Niveau 2', 'H'),
(285, 'SOBEGI Lacq', 'H'),
(286, 'SOBEGI Mourenx', 'H'),
(287, 'TOTAL CSTJF', 'H'),
(288, 'TIGF Lussagnet', 'H'),
(289, 'Sécurité ERTech', 'H'),
(290, 'Superviseur travaux (SOBEGI Lacq/Mourenx)', 'H'),
(291, 'Utilisation échafaudages', 'H'),
(292, 'Réception échafaudage', 'H'),
(293, 'Sensibilisation ATEX', 'H'),
(294, 'Port ARI', 'H'),
(295, 'OPPBTP Encadrant', 'H'),
(296, 'Sauveteur Secouriste du Travail', 'H'),
(297, 'Electricité: BO-HO-HOV Très basse tension', 'H'),
(298, 'Electricité: BR Basse tension', 'H'),
(299, 'Utilisation extincteurs', 'H'),
(300, 'Gestion d\'entreprise', 'G'),
(301, 'Gestion ressources humaines', 'G'),
(302, 'Gestion stratégie d\'entreprise', 'G'),
(303, 'Superviseur et coordinateur des services', 'G'),
(304, 'Démarche commerciale', 'G'),
(305, 'Relation clients', 'G'),
(306, 'Gestion comptabilité', 'G'),
(307, 'Gestion paye', 'G'),
(308, 'Gestion système QSSE', 'G'),
(309, 'Pharmacie', 'S'),
(310, 'Pétrochimie', 'S'),
(311, 'Ferroviaire', 'S'),
(312, 'Agroalimentaire', 'S'),
(313, 'Raffinage', 'S'),
(314, 'Chimie', 'S'),
(315, 'Automobile', 'S'),
(316, 'Gaz', 'S'),
(317, 'Anglais', 'L'),
(318, 'Espagnol', 'L'),
(319, 'Allemand', 'L');

-- --------------------------------------------------------

--
-- Structure de la table `connu`
--

CREATE TABLE `connu` (
  `code_p` bigint(20) UNSIGNED NOT NULL,
  `code_c` bigint(20) UNSIGNED NOT NULL,
  `duree` int(11) DEFAULT NULL,
  `niveau` varchar(100) DEFAULT NULL,
  `obtention` date DEFAULT NULL,
  `expire` date DEFAULT NULL,
  `lieu` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `connu`
--

INSERT INTO `connu` (`code_p`, `code_c`, `duree`, `niveau`, `obtention`, `expire`, `lieu`) VALUES
(2, 258, 0, '', NULL, NULL, '');

-- --------------------------------------------------------

--
-- Structure de la table `experience`
--

CREATE TABLE `experience` (
  `code_e` bigint(20) UNSIGNED NOT NULL,
  `fonction` varchar(100) NOT NULL,
  `debut` date NOT NULL,
  `fin` date NOT NULL,
  `remun` int(11) UNSIGNED NOT NULL,
  `interess` int(11) UNSIGNED DEFAULT NULL,
  `avantage` varchar(500) DEFAULT NULL,
  `motifDepart` varchar(500) NOT NULL,
  `vehFonc` tinyint(1) DEFAULT NULL,
  `vehServ` tinyint(1) DEFAULT NULL,
  `indemnDepl` varchar(100) DEFAULT NULL,
  `repas` float UNSIGNED DEFAULT NULL,
  `prime` int(11) UNSIGNED DEFAULT NULL,
  `autrePrime` varchar(200) DEFAULT NULL,
  `problem` varchar(500) DEFAULT NULL,
  `objectif` varchar(500) DEFAULT NULL,
  `activite` varchar(500) NOT NULL,
  `resultat` varchar(500) DEFAULT NULL,
  `nomSoc` varchar(50) NOT NULL,
  `lieuSoc` varchar(50) DEFAULT NULL,
  `caSoc` int(11) UNSIGNED DEFAULT NULL,
  `nbSalSoc` int(11) UNSIGNED DEFAULT NULL,
  `nomContact` varchar(50) DEFAULT NULL,
  `prenomContact` varchar(50) DEFAULT NULL,
  `fctContact` varchar(50) DEFAULT NULL,
  `numContact` varchar(10) DEFAULT NULL,
  `permContact` tinyint(1) DEFAULT NULL,
  `dernierJob` tinyint(1) NOT NULL,
  `code_p` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `postulant`
--

CREATE TABLE `postulant` (
  `code_p` bigint(20) UNSIGNED NOT NULL,
  `log` varchar(200) NOT NULL,
  `mdp` varchar(200) NOT NULL,
  `sel` varchar(255) NOT NULL,
  `profil` varchar(1) NOT NULL,
  `nom` varchar(40) DEFAULT NULL,
  `prenom` varchar(60) DEFAULT NULL,
  `nationalite` varchar(50) DEFAULT NULL,
  `adresse` varchar(500) DEFAULT NULL,
  `codePostal` char(5) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `tel1` char(10) DEFAULT NULL,
  `tel2` char(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `naissDate` date DEFAULT NULL,
  `naissLieu` varchar(50) DEFAULT NULL,
  `numSecu` char(15) DEFAULT NULL,
  `situationMari` varchar(50) DEFAULT NULL,
  `metierConj` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `cv` varchar(255) DEFAULT NULL,
  `motiv` text,
  `nbEnfant` int(2) DEFAULT NULL,
  `naissEnfant` varchar(50) DEFAULT NULL,
  `situationPro` varchar(50) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `poste` varchar(50) DEFAULT NULL,
  `remun` int(11) UNSIGNED DEFAULT NULL,
  `mobNor` tinyint(1) DEFAULT NULL,
  `mobEst` tinyint(1) DEFAULT NULL,
  `mobRa` tinyint(1) DEFAULT NULL,
  `mobSud` tinyint(1) DEFAULT NULL,
  `mobIdf` tinyint(1) DEFAULT NULL,
  `mobInt` tinyint(1) DEFAULT NULL,
  `mobDemen` tinyint(1) DEFAULT NULL,
  `mobGd` tinyint(1) DEFAULT NULL,
  `mobLocal` varchar(100) DEFAULT NULL,
  `etam` tinyint(1) DEFAULT NULL,
  `cadre` tinyint(1) DEFAULT NULL,
  `cdi` tinyint(1) DEFAULT NULL,
  `cdd` tinyint(1) DEFAULT NULL,
  `nego` tinyint(1) DEFAULT NULL,
  `dispo` date DEFAULT NULL,
  `nonConcu` tinyint(1) DEFAULT NULL,
  `convColl` varchar(100) DEFAULT NULL,
  `dateEntretien` date DEFAULT NULL,
  `documents` varchar(2048) DEFAULT NULL,
  `vivier` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `postulant`
--

INSERT INTO `postulant` (`code_p`, `log`, `mdp`, `sel`, `profil`, `nom`, `prenom`, `nationalite`, `adresse`, `codePostal`, `ville`, `tel1`, `tel2`, `email`, `naissDate`, `naissLieu`, `numSecu`, `situationMari`, `metierConj`, `photo`, `cv`, `motiv`, `nbEnfant`, `naissEnfant`, `situationPro`, `source`, `poste`, `remun`, `mobNor`, `mobEst`, `mobRa`, `mobSud`, `mobIdf`, `mobInt`, `mobDemen`, `mobGd`, `mobLocal`, `etam`, `cadre`, `cdi`, `cdd`, `nego`, `dispo`, `nonConcu`, `convColl`, `dateEntretien`, `documents`, `vivier`) VALUES
(1, 'lg', '$2a$10$0xUBYFs3aJqReqjsai2E3OBOVFgoRyHVVZuMHGuSUGHibviGQ./cq', '$2a$10$0xUBYFs3aJqReqjsai2E3O', 'A', 'Gustavo', 'Luiz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'dp', '$2a$10$vjwFHavN0EIk8ml3EmaO.eXM03HyPjHkSh39hThdlslgSDmKfjBBm', '$2a$10$vjwFHavN0EIk8ml3EmaO.e', 'U', 'Payet', 'Dimitri', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, NULL, 0, NULL, NULL, '', 0),
(3, 'ft', '$2a$10$RNy7LLQxzv0v5J3LJ.Tcz.QJwdHtn5GZMCuNsOmmObXunqsB8nRZK', '$2a$10$RNy7LLQxzv0v5J3LJ.Tcz.', 'U', 'Thauvin', 'Florian', 'France', '2 Rue Calonge', '64230', 'UZEIN', '0505050505', '0606060606', NULL, '2018-03-13', NULL, NULL, NULL, NULL, '', '', NULL, 0, NULL, NULL, '', NULL, NULL, 1, 1, 1, 1, 1, 1, 1, 1, NULL, 0, 0, 0, 0, 0, NULL, 0, NULL, NULL, '', 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `connaissance`
--
ALTER TABLE `connaissance`
  ADD PRIMARY KEY (`code_c`);

--
-- Index pour la table `connu`
--
ALTER TABLE `connu`
  ADD PRIMARY KEY (`code_c`,`code_p`),
  ADD UNIQUE KEY `code_connu` (`code_c`,`code_p`),
  ADD KEY `fk_connu_postulant` (`code_p`);

--
-- Index pour la table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`code_e`),
  ADD KEY `fk_experience_postulant` (`code_p`);

--
-- Index pour la table `postulant`
--
ALTER TABLE `postulant`
  ADD PRIMARY KEY (`code_p`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `connaissance`
--
ALTER TABLE `connaissance`
  MODIFY `code_c` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=320;
--
-- AUTO_INCREMENT pour la table `experience`
--
ALTER TABLE `experience`
  MODIFY `code_e` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `postulant`
--
ALTER TABLE `postulant`
  MODIFY `code_p` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `connu`
--
ALTER TABLE `connu`
  ADD CONSTRAINT `connu_ibfk_1` FOREIGN KEY (`code_p`) REFERENCES `postulant` (`code_p`),
  ADD CONSTRAINT `connu_ibfk_2` FOREIGN KEY (`code_c`) REFERENCES `connaissance` (`code_c`);

--
-- Contraintes pour la table `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`code_p`) REFERENCES `postulant` (`code_p`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
