import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faPen, faLightbulb, faBell, faUser, faPlus, faChevronDown, faExclamationTriangle, faStar, faComment, faCommentAlt, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(faPen, faLightbulb, faFacebook, faGithub, faGoogle, faBell, faUser, faPlus, faChevronDown, faExclamationTriangle, faStar, faCommentAlt, faPaperclip)

dom.watch()