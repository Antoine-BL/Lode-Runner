/**
 * IMPORTANT: Il y a deux hauteurs différentes de sprite!
 * 1. pour DESTROY_[LR], la hauteur de chaque frame = 2 * dblHautCase
 * 2. pour NORMAL, la hauteur de chaque frame = dblHautCase
 */
const enumMapBrique = {
    DESTROY_R : [[0, 0],[1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],[7, 0]],        
    DESTROY_L : [[0, 1],[1, 1],[2, 1],[3, 1],[4, 1],[5, 1],[6, 1],[7, 1]],
    RESTORE : [[8, 0], [8, 1], [8, 2], [8, 3]]
}

const FPS_ANIM_BRIQUE = 0.2;

class Brique extends Case{
    constructor (intPosX, intPosY) {
        super(intPosX, intPosY, enumTypesBlocs.objBrique);
        this.objSpriteSheet = preloadImage('./assets/img/hole.png');
        this.tabEtatAnim = enumMapBrique.RESTORE;
        this.dblAnimFrame = 3;
        this.binDetruit = false;

        if (intPosX == 0 && intPosY == 2)
            console.log(this);
    }

    updateNav(tabGrilleNav) {
        if (this.intPosY > 0) {
            tabGrilleNav[this.intPosY - 1][this.intPosX] = true;                    
        }
    }

    mettreAJourAnimation () {
        this.dblAnimFrame += FPS_ANIM_BRIQUE;
        if (Math.round(this.dblAnimFrame) >= this.tabEtatAnim.length) {
            this.dblAnimFrame = this.tabEtatAnim.length - 1;
        }
    }

    dessiner () {
        let intFrameExact = Math.round(this.dblAnimFrame);

        let intHauteur = this.tabEtatAnim === enumMapBrique.RESTORE ? 1 : 2;

        objC2D.drawImage(this.objSpriteSheet, 
            dblLargCase * this.tabEtatAnim[intFrameExact][0], dblHautCase * this.tabEtatAnim[intFrameExact][1] * intHauteur,
            dblLargCase, dblHautCase * intHauteur,
            this.intPosX * dblLargCase, (this.intPosY - intHauteur + 1) * dblHautCase,
            dblLargCase, dblHautCase * intHauteur);
    }
    
    detruire(binDroite) {
        this.dblAnimFrame = 0;
        this.binDetruit = true;
        this.tabEtatAnim = binDroite ? enumMapBrique.DESTROY_R : enumMapBrique.DESTROY_L;
        window.setTimeout(() => {
            this.binDetruit = false;
            this.tabEtatAnim = enumMapBrique.RESTORE;
            this.dblAnimFrame = 0;
        }, 8000);
    }
}