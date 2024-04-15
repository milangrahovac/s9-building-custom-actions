const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')


function run() {
    // 1) Get some input values
    const bucket = core.getInput('bucket', { requred: true });
    const bucketRegion = core.getInput('bucket-region', { requred: true });
    const distFolder = core.getInput('dist-folder', { requred: true });

    // 2) Upload my files.
    const s3Url = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Url} --region ${bucketRegion} `);
    
    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
// output website address
    core.setOutput('website-url', websiteUrl); 

    core.notice('Hellow World!');
}

run();