const Uuid = {
    /**
     * @function generate
     * @description Generate a UUID v4
     * @returns {string} UUID v4
     * @see {@link https://en.wikipedia.org/wiki/Universally_unique_identifier|UUID}
     * 
     * @example
     * const uuid = Uuid.generate();
     * console.log(uuid); // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
     */
    generate: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * @function validate
     * @description Validate a UUID
     * @param {string} uuid - UUID to validate
     * @returns {boolean} true if valid, false otherwise
     * @see {@link https://en.wikipedia.org/wiki/Universally_unique_identifier|UUID}
     * 
     * @example
     * const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
     * const isValid = Uuid.validate(uuid);
     * console.log(isValid); // true
     * 
     * @example
     * const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxxxx';
     * const isValid = Uuid.validate(uuid);
     * console.log(isValid); // false
     */
    validate: (uuid) => {
        const pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
        return pattern.test(uuid);
    }
};

export default Uuid;