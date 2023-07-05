class ApiFeatures{
    
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        if (this.queryStr) {
            // Create a copy of the object
            const queryObj = {...this.queryStr};
    
            // Remove object whyich is not required for filter
            const excludeFiles = ['limit', 'sort', 'page', 'fields'];
            excludeFiles.forEach( el => delete queryObj[el]);
    
            // Replace Mongodb attr like gt to $gt
            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
            const newQueryObj = JSON.parse(queryStr);
    
            this.query = this.query.find(newQueryObj);
            return this;
        }
    }

    sort(){
        let sort = this.queryStr.sort;
        if (sort) {
            sort = sort.split(',').join(' ');
            this.query = this.query.sort(sort);
        }else{
            // sort by latest data by default
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    fields(){
        let fields = this.queryStr.field;
        if (fields) {
            fields = fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            // remove this field by default 
            this.query = this.query.select('-__v');
        }
        return this;
    }

    pagination(){
        const page = this.query.page * 1 || 1;
        const limit = this.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = ApiFeatures;