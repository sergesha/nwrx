module.exports = {
    name: 'common-ngx-immutable-store',
    preset: '../../../jest.config.js',
    coverageDirectory: '../../../coverage/libs/common/ngx-immutable-store',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
