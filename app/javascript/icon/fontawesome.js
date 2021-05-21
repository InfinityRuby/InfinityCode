import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faPen, faLightbulb, faBell, faUser, faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(faPen, faLightbulb, faFacebook, faGithub, faGoogle, faBell, faUser, faPlus, faChevronDown)

dom.watch()