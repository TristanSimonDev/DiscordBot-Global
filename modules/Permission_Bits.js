const Permission_Bits = {
    CREATE_INSTANT_INVITE:                  0x0000000000000001, // 1
    KICK_MEMBERS:                           0x0000000000000002, // 2
    BAN_MEMBERS:                            0x0000000000000004, // 4
    ADMINISTRATOR:                          0x0000000000000008, // 8
    MANAGE_CHANNELS:                        0x0000000000000010, // 16
    MANAGE_GUILD:                           0x0000000000000020, // 32
    ADD_REACTIONS:                          0x0000000000000040, // 64
    VIEW_AUDIT_LOG:                         0x0000000000000080, // 128
    PRIORITY_SPEAKER:                       0x0000000000000100, // 256
    STREAM:                                 0x0000000000000200, // 512
    VIEW_CHANNEL:                           0x0000000000000400, // 1024
    SEND_MESSAGES:                          0x0000000000000800, // 2048
    SEND_TTS_MESSAGES:                      0x0000000000001000, // 4096
    MANAGE_MESSAGES:                        0x0000000000002000, // 8192
    EMBED_LINKS:                            0x0000000000004000, // 16384
    ATTACH_FILES:                           0x0000000000008000, // 32768
    READ_MESSAGE_HISTORY:                   0x0000000000010000, // 65536
    MENTION_EVERYONE:                       0x0000000000020000, // 131072
    USE_EXTERNAL_EMOJIS:                    0x0000000000040000, // 262144
    VIEW_GUILD_INSIGHTS:                    0x0000000000080000, // 524288
    CONNECT:                                0x0000000000100000, // 1048576
    SPEAK:                                  0x0000000000200000, // 2097152
    MUTE_MEMBERS:                           0x0000000000400000, // 4194304
    DEAFEN_MEMBERS:                         0x0000000000800000, // 8388608
    MOVE_MEMBERS:                           0x0000000001000000, // 16777216
    USE_VAD:                                0x0000000002000000, // 33554432
    CHANGE_NICKNAME:                        0x0000000004000000, // 67108864
    MANAGE_NICKNAMES:                       0x0000000008000000, // 134217728
    MANAGE_ROLES:                           0x0000000010000000, // 268435456
    MANAGE_WEBHOOKS:                        0x0000000020000000, // 536870912
    MANAGE_GUILD_EXPRESSIONS:               0x0000000040000000, // 1073741824
    USE_APPLICATION_COMMANDS:               0x0000000080000000, // 2147483648
    REQUEST_TO_SPEAK:                       0x0000000100000000, // 4294967296
    MANAGE_EVENTS:                          0x0000000200000000, // 8589934592
    MANAGE_THREADS:                         0x0000000400000000, // 17179869184
    CREATE_PUBLIC_THREADS:                  0x0000000800000000, // 34359738368
    CREATE_PRIVATE_THREADS:                 0x0000001000000000, // 68719476736
    USE_EXTERNAL_STICKERS:                  0x0000002000000000, // 137438953472
    SEND_MESSAGES_IN_THREADS:               0x0000004000000000, // 274877906944
    USE_EMBEDDED_ACTIVITIES:                0x0000008000000000, // 549755813888
    MODERATE_MEMBERS:                       0x0000010000000000, // 1099511627776
    VIEW_CREATOR_MONETIZATION_ANALYTICS:    0x0000000020000000, // 2199023255552
    USE_SOUNDBOARD:                         0x0000040000000000, // 4398046511104
    CREATE_GUILD_EXPRESSIONS:               0x0000080000000000, // 8796093022208
    CREATE_EVENTS:                          0x0000100000000000, // 17592186044416
    USE_EXTERNAL_SOUNDS:                    0x0000200000000000, // 35184372088832
    SEND_VOICE_MESSAGES:                    0x0000400000000000, // 70368744177664
    SEND_POLLS:                             0x0002000000000000  // 1125899906842624
};

module.exports = Permission_Bits;
