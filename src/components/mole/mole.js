import MoleTemplate from './mole.template';
import createElementFromHTML from '../../createElementFromHTML';

class Mole {
    constructor() {
        this.state = {
            active: false,
            element: createElementFromHTML(MoleTemplate),
        };
        this.state.svg = this.state.element.querySelector('svg'),
        this.state.svg.style.display = 'none';        
        this.state.element.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const event = this.state.active ? 'whack' : 'miss';
            this.state.element.dispatchEvent(new CustomEvent(event, { bubbles: true}));
            if (this.state.active)
                this.stop();
        });
    }

    go(timeout) {
        this.state.active = true;
        this.state.svg.style.display = '';
        setTimeout(this.stop.bind(this), timeout);
    }
    
    stop() {
        this.state.active = false;
        this.state.svg.style.display = 'none';
    }
}

export default Mole;