const cryptoRandomString = require('crypto-random-string');

let flatArr = [];
let userArr = [];

const randomBetween = max => Math.floor(Math.random() * (max + 1));

const companyArrGenerator = num => {
    const arr = [];
    for (let i = 0; i < num; i++) {
        const companyCode = cryptoRandomString({ length: 8 });
        const companyName = `Company_Name_${companyCode}`;
        arr.push({
            comCd: companyCode,
            comNm: companyName,
            deptCdPath: `/${companyCode}/`,
            deptNmPath: `//${companyName}//`
        });
    }
    return arr;
};

const generateDepartment = (company, parent) => {
    const departmentCode = cryptoRandomString({ length: 8 });
    const departmentName = `Department_Name_${departmentCode}`;
    return {
        deptCd: departmentCode,
        deptNm: departmentName,
        deptENm: `Department_English_Name_${departmentCode}`,
        deptCdPath: `${parent.deptCdPath}${departmentCode}/`,
        deptNmPath: `${parent.deptNmPath}${departmentName}//`,
        comCd: company.comCd,
        comNm: `Company Name ${company.comNm}`,
        deptGubun: cryptoRandomString({ length: 3 }),
        deptGubunNm: cryptoRandomString({ length: 1 }),
        deptGroup: cryptoRandomString({ length: 2 })
    };
};

const generateDepartmentArr = (num, company, parent) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
        const dept = generateDepartment(company, parent);
        flatArr.push(Object.assign({}, dept));
        arr.push(dept);
    }
    return arr;
};

const generateDepartmentNest = (company, level, maxNum, parent) => {
    if (level === 1) {
        const childs = generateDepartmentArr(maxNum, company, parent);
        return childs;
    }
    const currMaxNum = randomBetween(maxNum);
    const departmentArr = generateDepartmentArr(currMaxNum, company, parent);
    for (const dept of departmentArr) {
        const nextMaxNum = randomBetween(maxNum);
        const result = generateDepartmentNest(company, level - 1, nextMaxNum, dept);
        dept.childs = result;
    }
    return departmentArr;
};

const generator = isRefresh => {
    if (isRefresh) {
        flatArr = [];
    } else if (flatArr.length > 0) {
        return flatArr;
    }

    const companyArr = companyArrGenerator(4);

    for (const company of companyArr) {
        flatArr.push(Object.assign({}, company));
    }

    for (const company of companyArr) {
        const maxNumDepartment = randomBetween(8);
        const level = 3;
        generateCompanyNestData(company, level, maxNumDepartment);
    }

    // console.log(JSON.stringify(companyArr));
    console.log();
    // console.log(JSON.stringify(flatArr));

    return flatArr;
};

const generateCompanyNestData = (company, level, maxNumDept) => {
    company.childs = generateDepartmentNest(company, level, maxNumDept, company);
    return company;
};

const generatorUser = department => {
    const userCode = cryptoRandomString({ length: 8 });
    const user = {
        titleNm: `Title_${userCode}`,
        name: `Name_${userCode}`,
        username: `username_${userCode}`,
        comCd: `${department.comCd}`,
        comNm: `${department.comNm}`,
        deptNm: `${department.deptNm}`,
        deptCd: `${department.deptCd}`
    };
    return user;
};

const generateUserArr = (num, department) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
        const user = generatorUser(department);
        arr.push(user);
    }
    return arr;
};

const generatorUserExport = isRefresh => {
    if (isRefresh) {
        userArr = [];
    } else if (userArr.length > 0) {
        return userArr;
    }

    if (!flatArr || flatArr.length === 0) {
        generator();
    }

    const maxUserPerDept = randomBetween(20);
    for (const item of flatArr) {
        if (!item.deptCd) {
            continue;
        }
        userArr = userArr.concat(generateUserArr(maxUserPerDept, item));
    }
    console.log('userArr', userArr);
    return userArr;
};

const refreshData = () => {
    isRefresh = true;
    generator(isRefresh);
    generatorUserExport(isRefresh);
    return 'refreshed';
};

module.exports = {
    refreshData,
    generatorUserExport,
    generatorDepartment: generator
};
