import { v4 as uuidv4 } from 'uuid';

export const getUniqueId = () => {
    return `${uuidv4()}-${Date.now()}-${Math.random() * 1000}`;
}
