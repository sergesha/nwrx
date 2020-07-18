module.exports = {
    name: 'demo-ngx-intercom',
    preset: '../../../jest.config.js',
    coverageDirectory: '../../../coverage/apps/demo/ngx-intercom',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
