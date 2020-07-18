module.exports = {
    name: 'common-ngx-intercom',
    preset: '../../../jest.config.js',
    coverageDirectory: '../../../coverage/libs/common/ngx-intercom',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
